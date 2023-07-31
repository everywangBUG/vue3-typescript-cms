interface ICollection {
  [index: string]: any
  length: number
}

function logCollection(collection: ICollection) {
  for (let i = 0; i < collection.length; i++) {
    console.log(collection[i])
    // alert(collection[i])
  }
}

const tuple: [string, number, number] = ['zhangsan', 18, 1.89]
const arr: string[] = ['aaa', 'bbb', 'ccc']
logCollection(tuple)
logCollection(arr)

export default logCollection