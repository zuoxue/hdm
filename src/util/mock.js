const mock = require('mockjs')
const Random = mock.Random

const logData = function (){
  let articles = [];
  for (let i = 0; i < 100; i++) {
      let newArticleObject = {
        user : Random.cname(),
        type : Random.name(5),
        name : Random.cname(),
        serviceType : Random.name(5),
        visitType : Random.name(),
        date:Random.date()+ ' ' + Random.time(),
        result:(Math.random()) < 0.5?"正在运行":"查看结果",
        ip:Random.ip()
      }
      articles.push(newArticleObject)
  }

  return {
      articles: articles
  }
}

const hdfs = function (){
  let articles = [];
  for (let i = 0; i < 100; i++) {
      let newArticleObject = {
        name : {name:Random.name(),iconfont:'iconfont icon-iconset0196'},
        size : Math.floor((Math.random()*10000)),
        user : Random.cname(),
        group : Random.pick(["hrdd","dsds",'fefdd']),
        permission : Random.pick(['rwxr-xr-x','rwxrwxr-x','rwxr-xrwx','rwxr-x--x']),
        quota:Random.pick(['10TB,-',"20TB,-",'-,-',"-,5TB"]),
        modifytime:Random.date()+' '+Random.time()
      }
      articles.push(newArticleObject)
  }

  return {
      articles: articles
  }
}
mock.mock("/hdm/logData","post",logData)
mock.mock("/hdm/hdfs","post",hdfs)
