function isEmpty (obj) {
  if (typeof obj === 'undefined' || obj === null || obj === '') {
    return true
  } else {
    return false
  }
}

export function toTreeDatax (data, pid) {
  var pos = {}
  var tree = []
  var i = 0
  while (data.length !== 0) {
    console.log('====================开始遍历' + i + '====================')
    try {
      if (!isEmpty(data[i][pid])) {
        if (data[i][pid] === 0) {
          data[i].children = []
          tree.push(data[i])
          pos[data[i].id] = [tree.length - 1]
          data.splice(i, 1)
          i--
        } else {
          var posArr = pos[data[i][pid]]
          if (posArr !== undefined) {
            var obj = tree[posArr[0]]
            for (var j = 1; j < posArr.length; j++) {
              obj = obj.children[posArr[j]]
            }
            data[i].children = []
            obj.children.push(data[i])
            pos[data[i].id] = posArr.concat([obj.children.length - 1])
            data.splice(i, 1)
            i--
          }
        }
        i++
        if (i > data.length - 1) {
          i = 0
        }
      } else {
        throw new SyntaxError('=====Did not find the parent node specified to traverse key: ' + pid + '=====\n=====没有找到指定进行遍历的父节点 key: ' + pid)
      }
    } catch (e) {
      console.log(e)
      return null
    }
  }
  return tree
}

export function toTreeData (data, pid) {
  var datax = JSON.parse(JSON.stringify(data))
  var pos = {}
  var tree = []
  var i = 0
  while (data.length !== 0) {
    // console.log('====================开始遍历' + i + '====================')
    // console.log(data[i][pid])
    // console.log(datax.findIndex((item) => item.id === data[i][pid]))
    try {
      if (!isEmpty(data[i][pid])) {
        if (data[i][pid] === 0 || datax.findIndex((item) => item.id === data[i][pid]) < 0) {
          data[i].children = []
          tree.push(data[i])
          pos[data[i].id] = [tree.length - 1]
          data.splice(i, 1)
          i--
        } else {
          var posArr = pos[data[i][pid]]
          if (posArr !== undefined) {
            var obj = tree[posArr[0]]
            for (var j = 1; j < posArr.length; j++) {
              obj = obj.children[posArr[j]]
            }
            data[i].children = []
            obj.children.push(data[i])
            pos[data[i].id] = posArr.concat([obj.children.length - 1])
            data.splice(i, 1)
            i--
          }
        }
        i++
        if (i > data.length - 1) {
          i = 0
        }
      } else {
        throw new SyntaxError('=====Did not find the parent node specified to traverse key: ' + pid + '=====\n=====没有找到指定进行遍历的父节点 key: ' + pid)
      }
    } catch (e) {
      console.log(e)
      return null
    }
  }
  return tree
}
