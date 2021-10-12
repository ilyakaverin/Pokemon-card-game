export const counterWin = (board, playerOne, playerTwo) => {
    let playerOneCount = playerOne.length;
    let playerTwoCount = playerTwo.length;
    board.forEach((item) => {
      if (item.card.possession === "red") {
        playerTwoCount++;
      }
      if (item.card.possession === "blue") {
        playerOneCount++;
      }
    });
    return [playerOneCount, playerTwoCount];
  };

  export const returnBoard = (board) => {
    return board.map((item, index) => {
      let card = null;
      if (typeof item === "object") {
        card = {
          ...item.poke,
          possession: item.holder === "p1" ? "blue" : "red",
        };
      }
      return {
        position: index + 1,
        card,
      };
    });
  };
