
const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');

class MergeJsonFile {
  constructor(option) {
    this.option = Object.assign({}, {
      def: path.resolve(__dirname, 'default.js'),
      from: '',
      to: './dist'
    }, option);
    // 读取默认配置文件
    this.defaultConfig = require(this.option.def);
  }
  readPath(path_str) {
    return new Promise((resolve, reject) => {
      fs.exists(path_str, (flag) => {
        if(flag) {
          // 文件存在
          let data = require(path_str)
          resolve(data)
        } else {
          // 文件不存在
          reject({})
        }
      })
    })
  }
  writePath(filename_path, content) {
    content = typeof content === 'string' ? content : JSON.stringify(content, false, 4)
    return new Promise((resolve, reject) => {
      fs.outputFile(filename_path, content, err => {
        if(err) {
          reject(err)
        }
        resolve()
      })
    })
  }
  async mergeJson(str_list) {
    let arr = []
    for(let i = 0; i < str_list.length; i++){
      arr.push(await this.readPath(str_list[i]))
    }
    // 拷贝合并数据
    // return Object.assign({}, this.defaultConfig, ...arr)
    return _.merge(this.defaultConfig, ...arr)
  }
  toSaveFile() {
    let customerSourcePath = this.option.from
    // 数据正确性
    if(typeof customerSourcePath === 'string') {
      customerSourcePath = [customerSourcePath]
    } else if(!(customerSourcePath instanceof Array)) {
      customerSourcePath = []
    }
    return this.mergeJson(customerSourcePath).then(res => {
      this.writePath(this.option.to, res)
    })
  }
  // 插件开始实例
  apply(compiler) {
    compiler.plugin('done', () => {
      // 开始写入配置文件
      this.toSaveFile()
    });
  }
}

module.exports = MergeJsonFile
