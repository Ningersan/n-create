import program from 'commander'

//开始解析用户输入的命令
program.parse(process.argv)

try {
    // 根据不同的命令转到不同的命令处理文件
    require('./command/' + program.args[0] + '.js')
} catch (e) {
    program.help()
}
