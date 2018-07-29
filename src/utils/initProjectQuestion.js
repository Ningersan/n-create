import { resolve } from 'path'
import { exists } from 'mz/fs'

/**
 * 项目初始化问题整理
 * @param  {[type]} template [description]
 * @param  {[type]} user     [description]
 * @param  {[type]} email    [description]
 * @return {[type]}          [description]
 */
export default function askCreator({ choices }) {
    return [
        {
            type: 'list',
            name: 'repo',
            message: 'which repo do you want to install?',
            choices,
        },
        // {
        //     type: 'input',
        //     name: 'dir',
        //     message: 'project name',
        //     async validate(input) {
        //         const done = this.async()
        //         if (input.length === 0) {
        //             done('You must input project name')
        //             return
        //         }
        //         const dir = resolve(process.cwd(), input)
        //         if (await exists(dir)) {
        //             done(
        //                 'The project name is already existed. Please change another name'
        //             )
        //         }
        //         done(null, true)
        //     },
        // },
        // {
        //     type: 'confirm',
        //     name: 'private',
        //     message: 'Is the project private ?',
        // },
        // {
        //     type: 'input',
        //     name: 'name',
        //     message: 'package name',
        //     default: template,
        //     validate(input) {
        //         const done = this.async()
        //         if (input.trim().length === 0) {
        //             done('project name is empty')
        //             return
        //         }
        //         done(null, true)
        //     },
        // },

        // {
        //     type: 'input',
        //     name: 'description',
        //     message: 'description',
        // },

        // {
        //     type: 'list',
        //     name: 'license',
        //     message: 'license',
        //     choices: [
        //         'MIT',
        //         "BSD 2-clause 'Simplified'",
        //         'Apache 2.0',
        //         'GNU General Public v3.0',
        //         'BSD 3-clause',
        //         'Eclipse Public 1.0',
        //         'GNU Affero General Public v3.0',
        //         'GNU General Public v2.0',
        //         'GNU Lesser General Public v2.1',
        //         'GNU Lesser General Public v3.0',
        //         'Mozilla Public 2.0',
        //         'The Unlicense',
        //     ],
        // },
        // {
        //     type: 'input',
        //     name: 'author',
        //     message: 'author',
        //     default: email,
        // },
        // {
        //     type: 'input',
        //     name: 'git',
        //     message: 'user/repo',
        //     default: `${user}/${template}`,
        //     validate(input) {
        //         const done = this.async()
        //         if (!/\w+\/\w+/.test(input)) {
        //             done('Please input like user/repo')
        //             return
        //         }
        //         done(null, true)
        //     },
        // },
    ]
}
