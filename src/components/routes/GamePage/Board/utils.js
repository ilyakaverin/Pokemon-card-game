
export const updateStats = async (statistic, user, key) => {

  const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(statistic)
  }
  await fetch(`https://pokemon-game-ca189-default-rtdb.asia-southeast1.firebasedatabase.app/${user.localId}/stats/${key}.json?auth=${localStorage.getItem('idToken')}`, requestOptions)

};

export const addWinPokemon =  async (winCard, user) => {

  const requestOptions = {
      method: 'POST',
      body: JSON.stringify(winCard),
  }
   await fetch(`https://pokemon-game-ca189-default-rtdb.asia-southeast1.firebasedatabase.app/${user.localId}/pokemons.json?auth=${localStorage.getItem('idToken')}`,requestOptions);
}


export const counterWin = (board, playerOne, playerTwo) => {
    let playerOneCount = playerOne.length;
    let playerTwoCount = playerTwo.length;
    board.forEach((item) => {
      if (item.card.possession === "red") {
        playerTwoCount += 1;
      }
      if (item.card.possession === "blue") {
        playerOneCount += 1;
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

  
