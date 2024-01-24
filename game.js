const main = document.querySelector("main")
const restart = document.querySelector(".restart")
const scoreText = document.querySelector(".score")

let snakeColor = "rgb(20, 36, 138)"
let appleColor = "rgb(98, 255, 124)"
let firstGridColor = "rgb(153, 143, 199)"
let secondGridColor = "rgb(212, 194, 252)"

let numOfCells = 100
let dead = false
let direction = "d"
let oldDirection = "d"
let angle = 0
let score = 0
let rNum = 0
let snake = [1, 0]

const timing = () => {
  ++time
  console.log(time)
  let m = parseInt(time / 60)
  let s = time % 60
  m = checkTime(m)
  s = checkTime(s)
  let clock = document.querySelector(".clock").children[0]
  clock.innerText = m + ":" + s
}
let time = 0
let timer = setInterval(() => {
  timing()
}, 1000)
function checkTime(i) {
  //stolen :)
  if (i < 10) {
    i = "0" + i
  } // add zero in front of numbers < 10
  return i
}

const randomNumber = () => {
  const num = parseInt(Math.random() * 100)
  const color = main.children[num].children[0].style.backgroundColor
  if (color == snakeColor) {
    return randomNumber()
  } else {
    return num
  }
}

// making the map
const map = (rows, columns) => {
  let cells = rows * columns
  numOfCells = cells

  for (let index = 0; index < cells; index++) {
    const div = document.createElement("div")
    div.innerHTML = "<div></div>"
    div.children[0].setAttribute("id", index)
    div.setAttribute("class", "cell")
    if (index % 2 == 0) {
      div.style.backgroundColor = firstGridColor
    } else {
      div.style.backgroundColor = secondGridColor
    }
    main.append(div)
  }
}

//eventlistener
addEventListener("keypress", (key) => {
  if (key.key.toLowerCase() == "w" && direction != "s") {
    direction = "w"
    if (oldDirection != direction && oldDirection == "a") {
      main.children[snake[0]].children[0].style.rotate = "45deg"
    } else if (oldDirection == "d") {
      main.children[snake[0]].children[0].style.rotate = "-45deg"
    }
  } else if (key.key.toLowerCase() == "s" && direction != "w") {
    direction = "s"
    if (oldDirection != direction && oldDirection == "a") {
      main.children[snake[0]].children[0].style.rotate = "-45deg"
    } else if (oldDirection == "d") {
      main.children[snake[0]].children[0].style.rotate = "45deg"
    }
  } else if (key.key.toLowerCase() == "a" && direction != "d") {
    direction = "a"
    if (oldDirection != direction && oldDirection == "w") {
      main.children[snake[0]].children[0].style.rotate = "45deg"
    } else if (oldDirection == "s") {
      main.children[snake[0]].children[0].style.rotate = "-45deg"
    }
  } else if (key.key.toLowerCase() == "d" && direction != "a") {
    direction = "d"
    if (oldDirection != direction && oldDirection == "w") {
      main.children[snake[0]].children[0].style.rotate = "-45deg"
    } else if (oldDirection == "s") {
      main.children[snake[0]].children[0].style.rotate = "45deg"
    }
  }
  oldDirection = direction
})

const eat = (index) => {
  main.children[index].children[0].classList.remove("apple")
  snake.push(index)
  num = randomNumber()
  score += 1
  scoreText.children[0].innerText = score
  main.children[num].children[0].classList.add("apple")
  main.children[num].children[0].style.backgroundColor = appleColor
}

const show = () => {
  main.children[snake[0]].children[0].classList.add("snake")
  main.children[snake[0]].children[0].style.backgroundColor = snakeColor
}

const showAll = () => {
  snake.forEach((el) => {
    main.children[el].children[0].classList.add("snake")
    main.children[el].children[0].style.backgroundColor = snakeColor
  })
}
const disappear = (index) => {
  main.children[index].children[0].style.rotate = ""
  main.children[index].children[0].classList.remove("snake")
  if (index % 2 == 0) {
    main.children[index].children[0].style.backgroundColor = firstGridColor
  } else {
    main.children[index].children[0].style.backgroundColor = secondGridColor
  }
}

const move = () => {
  let newCell = 0
  if (direction.toLowerCase() == "w") {
    newCell = snake[0] - 10
    if (snake[0] < 10) {
      newCell += 100
    }
  } else if (direction.toLowerCase() == "s") {
    newCell = snake[0] + 10
    if (snake[0] >= 90) {
      newCell -= 100
    }
  } else if (direction.toLowerCase() == "d") {
    newCell = snake[0] + 1
    if (snake[0] % 10 == 9) {
      newCell -= 10
    }
  } else if (direction.toLowerCase() == "a") {
    newCell = snake[0] - 1
    if (snake[0] % 10 == 0) {
      newCell += 10
    }
  }

  snake.unshift(newCell)
  if (main.children[newCell].children[0].style.backgroundColor == appleColor) {
    eat(newCell)
  } else if (
    main.children[newCell].children[0].style.backgroundColor == snakeColor
  ) {
    dead = true
    restart.disabled = false
    clearInterval(timer)
  }
  disappear(snake.pop())

  show()

  if (direction == "w" || direction == "s") {
    angle = 90
  } else {
    angle = 0
  }
  main.children[newCell].children[0].style.rotate = `${angle}deg`
}

const movement = () => {
  setTimeout(() => {
    if (!dead) {
      move()
      movement()
    } else {
      main.children[snake[0]].children[0].style.backgroundColor = "red"
      main.children[snake[0]].children[0].style.borderColor = "darkred"
    }
  }, 200)
}

restart.addEventListener("click", () => {
  dead = false
  direction = "d"
  oldDirection = "d"
  angle = 0
  snake = [1, 0]
  score = 0
  main.innerHTML = ""
  score = 0
  scoreText.children[0].innerText = score
  map(10, 10)
  showAll()
  movement()
  document.querySelector(".clock").children[0].innerText = "00:00"
  time = 0
  timer = setInterval(() => {
    timing()
  }, 1000)
  restart.disabled = true
  rNum = randomNumber()
  main.children[rNum].children[0].classList.add("apple")
  main.children[rNum].children[0].style.backgroundColor = appleColor
})

///starting the game

map(10, 10)
rNum = randomNumber()
showAll()
movement()
// timer = setInterval(() => {
//   timing
// }, 1000)
main.children[rNum].children[0].classList.add("apple")
main.children[rNum].children[0].style.backgroundColor = appleColor
