const main = document.querySelector("main")

let numOfCells = 100
let dead = false
let direction = "d"
let snake = [1, 0]

const randomNumber = () => {
  const num = parseInt(Math.random() * 100)
  const color = main.children[num].style.backgroundColor
  if (color == "blue") {
    return randomNumber()
  } else {
    return num
  }
}
// making the map
const map = (rows, columns) => {
  let cells = rows * columns
  numOfCells = cells
  //sizing
  // let hSize = "calc(100% /" + rows + ")"
  // let wSize = "calc(100% /" + columns + ")"
  // let hS = "calc(100vh /" + rows + ")"
  // let wS = "calc(100vw /" + columns + ")"
  // for (let index = 0; index < cells / 2; index++) {
  //   //const color = randomColor()
  //   colors.push(color)
  //   colors.push(color)
  // }
  for (let index = 0; index < cells; index++) {
    const div = document.createElement("div")
    //div.classList.add("card")
    div.setAttribute("id", index)
    div.setAttribute("value", "")
    div.setAttribute("class", "cell")
    //div.setAttribute("style", "width: " + wSize + "; height: " + hSize)
    //div.style.backgroundColor = "#abc"
    if (index % 2 == 0) {
      div.style.backgroundColor = "#9e9e9e"
    } else {
      div.style.backgroundColor = "#414141"
    }
    //div.innerText = "0"

    // adjusting the size of the cards

    //div.children[0].setAttribute("style", "width: " + wS + "; height: " + hS)
    main.append(div)
  }
  //makeEventListener()
}

//eventlistener
addEventListener("keypress", (key) => {
  console.log(key.key)
  if (key.key.toLowerCase() == "w" && direction != "s") {
    direction = "w"
  } else if (key.key.toLowerCase() == "s" && direction != "w") {
    direction = "s"
  } else if (key.key.toLowerCase() == "a" && direction != "d") {
    direction = "a"
  } else if (key.key.toLowerCase() == "d" && direction != "a") {
    direction = "d"
  }
})

const eat = (index) => {
  snake.push(index)
  num = randomNumber()
  main.children[num].style.backgroundColor = "red"
}

const show = () => {
  main.children[snake[0]].style.backgroundColor = "blue"
  main.children[snake[snake.length - 1]].style.backgroundColor = "blue"
}

const showAll = () => {
  snake.forEach((el) => {
    main.children[el].style.backgroundColor = "blue"
  })
}
const disappear = (index) => {
  if (index % 2 == 0) {
    main.children[index].style.backgroundColor = "#9e9e9e"
  } else {
    main.children[index].style.backgroundColor = "#414141"
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
  if (main.children[newCell].style.backgroundColor == "red") {
    eat(newCell)
  } else if (main.children[newCell].style.backgroundColor == "blue") {
    dead = true
  }
  disappear(snake.pop())

  show()
}

const movement = () => {
  setTimeout(() => {
    if (!dead) {
      //console.log("a")
      move()
      movement()
    } else {
      main.children[snake[0]].style.backgroundColor = "yellow"
    }
  }, 500)
}

///starting the game

map(10, 10)
//show()
showAll()
movement()
main.children[randomNumber()].style.backgroundColor = "red"
//console.log(snake[snake.length - 1])
console.log(randomNumber())
