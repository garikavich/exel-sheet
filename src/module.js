console.log('Module - Work')
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function start() {
    await sleep(1000)
    console.log('Module - Done2!Test')
}

start()
