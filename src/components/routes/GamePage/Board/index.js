import s from './style.module.css';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import PokemonCard from '../../../PokemonCards';
import { useHistory } from 'react-router-dom';
import PlayerBoard from './component/playerBoard';
import { useDispatch, useSelector } from 'react-redux';
import { SelectedPokemon, setWinner, selectPokemonsData } from '../../../../store/pokemons';
import { setPlayerToRedux } from '../../../../store/pokemons2';
import ArrowChoice from './component/ArrowChoice';
import request from '../../../../service/request';

const counterWin = (board, playerOne, playerTwo) => {
    let playerOneCount = playerOne.length;
    let playerTwoCount = playerTwo.length;
    board.forEach((item) => {
        if(item.card.possession === 'red') {
            playerTwoCount++;
        }
        if(item.card.possession === 'blue') {
            playerOneCount++;
        }

    });
    return [playerOneCount, playerTwoCount]

}


const BoardPage = () => {
    const history = useHistory();
    
    const selectedRedux = useSelector(SelectedPokemon);
    const pokemonsSelector = useSelector(selectPokemonsData);
    const dispatch = useDispatch();

    if(Object.keys(selectedRedux).length === 0) {
        history.replace('/game')
      }

    const [playerOne, setPlayerOne] = useState(() => {

        return Object.values(selectedRedux).map((item) => ({
            ...item,
            possession: 'blue'
        }))
    });

    const returnBoard = (board) => {
        return board.map((item, index) => {
            let card = null;
            if(typeof item === 'object') {
                card = {
                    ...item.poke,
                    possession: item.holder === 'p1' ? 'blue' : 'red'
                }
            }
            return {
                position: index + 1,
                card
            }
        })
    }

    const [playerTwo, setPlayerTwo] = useState([]);
    const [chooseCard, setChooseCard] = useState('');
    const [steps, setSteps] = useState(0);
    const [firstTurn, setFirstTurn] = useState(0);
    const [board, setBoard] = useState([]);
    const [serverBoard, setServerBoard] = useState([0,0,0, 0,0,0, 0,0,0])

    
    useEffect( () => {
        const fetchData = async () => {
            const boardRequest = await request.getBoard();
            setBoard(boardRequest.data);
            const player2Request = await request.gameStart({
                pokemons: Object.values(pokemonsSelector),
            });
            dispatch(setPlayerToRedux(player2Request.data)); 


            setTimeout(() => setFirstTurn(2), 1000);

            setPlayerTwo(() => player2Request.data.map((item) => ({
                ...item,
                possession: 'red'
            })))
             
        }
        
       fetchData()
    }, [])


    

    
    
    const handleBoardPlate = async (position) => {
        if (firstTurn === 2) {

            const params = {
                currentPlayer: 'p2',
               hands: {
                   p1: playerOne,
                   p2: playerTwo
              },
                move: null,
                board: serverBoard
           }
            if(chooseCard.player === 1) {
                setPlayerOne(prevState => prevState.filter((item) => item.id !== chooseCard.id));
                setChooseCard('');
            }
            const game = await request.game(params);
            console.log(firstTurn)

            setBoard(prevState => prevState.map(item => {
                if(item.position === position) {
                    return {
                        ...item,
                        card: chooseCard,
                    }
                }
                return item;
            }));
            
            setBoard(returnBoard(game.oldBoard));
            console.log(game)
            setSteps(prevState => {
                const count = prevState + 1;
                return count
            });
            if(game.move !== null) {
                const idAi = game.move.poke.id;
    
                setPlayerTwo(prevState => prevState.map(item => {
                    if(item.id === idAi) {
                        return {
                            ...item,
                            active: true,
                        }
                    }
                    return item
                }));
                setTimeout(() => {
                    setPlayerTwo(() => game.hands.p2.pokes.map(item => item.poke));
                    setServerBoard(game.board);
                    setBoard(returnBoard(game.board));
                    setSteps(prevState => {
                        const count = prevState + 1;
                        return count
                    });

                }, 1500)
            }
        }
    }
    
    useEffect(() => {
        if(steps === 9) {
            const [countOne, countTwo] = counterWin(board, playerOne, playerTwo);

            

            if(countOne > countTwo) {
                dispatch(setWinner('player1'))
                alert('Win')
                
            } else if (countOne < countTwo) {
                dispatch(setWinner('player2'))
                alert('Lose')
                
            } else {
                alert('TIE')
            }
            history.replace('/game/finish')

        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [steps]) 
    return (
        <div className={s.root}>
						<div className={cn(s.playerOne, {[s.turn]: chooseCard && chooseCard.player === 2})}>
                        <PlayerBoard player={1} cards={playerOne} onClickCard={(card) => setChooseCard(card)}/>
						</div>
            <div className={s.board}>
               {
                   board.map((item)=> (
                       <div
                       
                       key={item.position}
                       className={s.boardPlate}
                       onClick={() => !item.card && handleBoardPlate(item.position)} >
                        <ArrowChoice side={firstTurn}  /> 

                       {
                           item.card && <PokemonCard   {...item.card} active minimize />
                       }

                       </div>
                   ))
               }
            </div>
            <div className={cn(s.playerTwo, s.turn)}>
            
          <PlayerBoard player={2} cards={playerTwo } onClickCard={(card) => setChooseCard(card)} />
            </div>
        </div>
    );
};

export default BoardPage;