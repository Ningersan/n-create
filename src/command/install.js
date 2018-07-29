import program from 'commander'
import inquirer from 'inquirer'
import path from 'path'
import glob from 'glob'
import { readdir, exists } from 'mz/fs'
import { dirs } from '../config/constant'
import initQuestions from '../utils/initProjectQuestion'
import rmfr from 'rmfr'
import copyFile from '../utils/copyFile'
import metalsmithAction from '../utils/metalsmithAction'
import GitCtrl from '../utils/gitCtrl'
import config from '../config'
import OraLoading from '../utils/OraLoading'

// 初始化git操作类
let git = new GitCtrl(config.repoType, config.registry)

program
    // .usage('n-create install <project-name>')
    .command('install <project-name>')
    .description('install github project to local')
    .action(async projectName => {
        let repos, loader, list

        if (!projectName) {
            // project-name 必填
            program.help()
        }

        // check dirs
        // 遍历当前目录
        loader = OraLoading('check project name')
        list = glob.sync('*')
        // 获取执行当前命令的文件夹名称字符串
        const rootName = path.basename(process.cwd())

        if (await exists(projectName)) {
            loader.fail('project is already exist')
            return
        } else {
            loader.succeed('project name pass')
        }

        //list命令的实现体
        // to do
        console.log('install command')
        try {
            loader = OraLoading('fetch repo list')
            repos = await git.fetchRepoList()
            loader.succeed('fetch repo list success')
        } catch (e) {
            loader.fail('fetch repo list fail')
            throw new Error(e)
            return
        }

        if (repos.length === 0) {
            throw new Error(
                `There is no any scaffolds in https://github.com/${
                    config.registry
                }. Please create and try`
            )
        }

        const choices = repos.map(({ name }) => name)
        let questions = initQuestions({ choices })
        let answers = await inquirer.prompt(questions)

        // downloading
        try {
            const { repo } = answers
            loader = OraLoading('begin download repo')
            await git.downloadGitRepo([repo].join('@'))
            loader.succeed('download repe success')
        } catch (e) {
            loader.fail('download repe fail')
        }

        // check download dir
        loader = OraLoading('check download dir')
        if (await exists(dirs.download)) {
            loader.succeed('check download dir success')
        } else {
            loader.fail('check download dir fail')
            throw new Error(
                `There is no ${dirs.download}, Please check template install`
            )
        }

        // read download dir
        loader = OraLoading('read download dir')
        list = await readdir(dirs.download)
        loader.succeed('read download dir success')
        if (list.length === 0) {
            throw new Error(
                `There is no any scaffolds in your local folder ${
                    dirs.download
                }, install it`
            )
        }

        const { metalsmith } = config
        if (metalsmith) {
            const tmp = `${dirs.tmp}/${answers.repo}`

            // 复制一份到临时目录，在临时目录编译生成
            loader = OraLoading('copy file to tmp dir')
            await copyFile(`${dirs.download}/${answers.repo}`, tmp)
            loader.succeed('copy file to tmp dir success')

            await metalsmithAction(answers.repo, answers)

            loader = OraLoading('compiling', projectName)
            await copyFile(`${tmp}/${dirs.metalsmith}`, projectName)
            loader.succeed('compiling success')
            // 清除临时文件夹
            await rmfr(tmp)
        } else {
            loader = OraLoading('generating', projectName)
            await copyFile(`${dirs.download}/${answers.repo}`, projectName)
        }
        loader.succeed(`generated ${projectName}`)
    })

//开始解析用户输入的命令
program.parse(process.argv)
