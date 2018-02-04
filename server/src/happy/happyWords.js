export default async event => {
  // you can use ES7 with async/await and even TypeScript in your functions :)

  await new Promise(r => setTimeout(r, 50))

  const wordsEnum = [
    "真理惟一可靠的标准就是永远自相符合。 —— 欧文",
    "世界上一成不变的东西，只有“任何事物都是在不断变化的”这条真理。 —— 斯里兰卡",
    "相信谎言的人必将在真理之前毁灭。 —— 赫尔巴特",
    "一件事实是一条没有性别的真理。 —— 纪伯伦",
    "不用相当的独立功夫，不论在哪个严重的问题上都不能找出真理；谁怕用功夫，谁就无法找到真理。 —— 列宁"
  ]
  
  const randomNumber = parseInt(Math.random(100)*100)%5
  return {
    data: {
      message: `${wordsEnum[randomNumber]}`
    }
  }
}