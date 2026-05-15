const trashcore = require("./")

async function test() {
  try {
    let res = await trashcore.igstalk("fg.error")
    console.log(res)
  } catch (e) {
    console.error(e)
  }
}

test()
