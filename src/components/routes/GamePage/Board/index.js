import s from './style.module.css';
import { useEffect, useState } from 'react';
import PokemonCard from '../../../PokemonCards';
import { useHistory } from 'react-router-dom';
import PlayerBoard from './component/playerBoard';
import { useDispatch, useSelector } from 'react-redux';
import { SelectedPokemon, setWinner } from '../../../../store/pokemons';
import { setPlayerToRedux } from '../../../../store/pokemons2';

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
    const [board, setBoard] = useState([]);
    const selectedRedux = useSelector(SelectedPokemon);
    const dispatch = useDispatch();

    const [playerOne, setPlayerOne] = useState(() => {

        return Object.values(selectedRedux).map((item) => ({
            ...item,
            possession: 'blue'
        }))
    });
    const [playerTwo, setPlayerTwo] = useState([]);
    const [chooseCard, setChooseCard] = useState(null);
    const [steps, setSteps] = useState(0);

    if(Object.keys(selectedRedux).length === 0) {
      history.replace('/game')
    }
    useEffect( () => {
        const fetchData = async () => {
            const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
            const boardRequest = await boardResponse.json();
            setBoard(boardRequest.data); 
    
            const PlayerTwoResponse = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
            const PlayerTwoRequest = await PlayerTwoResponse.json();

            
    
             setPlayerTwo(() => {
                return PlayerTwoRequest.data.map((item) => ({
                    ...item,
                    possession: 'red',
                }))
             });
             dispatch(setPlayerToRedux(PlayerTwoRequest.data.map((item) => ({
                ...item,
            }))))
             
             
        }
       fetchData()
        // Effect callbacks are synchronous to prevent race conditions. Put the async function inside: 
    }, [])


    

    
    
    const handleBoardPlate = async (position) => {
        if (chooseCard) {
            const params = {
                position,
                card: chooseCard,
                board,
            };
            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
    
            });
            const request = await res.json();
            if(chooseCard.player === 1) {
                setPlayerOne(prevState => prevState.filter((item) => item.id !== chooseCard.id))
            }
            if(chooseCard.player === 2) {
                setPlayerTwo(prevState => prevState.filter((item) => item.id !== chooseCard.id))
            }
            setBoard(request.data);
            setSteps(prevState => {
                const count = prevState + 1;
                return count
            })
            
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

    }, [steps])
    return (
        <div className={s.root}>
						<div className={s.playerOne}>
                        <PlayerBoard player={1} cards={playerOne} onClickCard={(card) => setChooseCard(card)}/>
						</div>
            <div className={s.board}>
               {
                   board.map((item)=> (
                       <div 
                       key={item.position}
                       className={s.boardPlate}
                       onClick={() => !item.card && handleBoardPlate(item.position)} >

                       {
                           item.card && <PokemonCard {...item.card} active minimize />
                       }

                       </div>
                   ))
               }
            </div>
            <div className={s.playerTwo}>
          <PlayerBoard player={2} cards={playerTwo } onClickCard={(card) => setChooseCard(card)} />
            </div>
        </div>
    );
};

export default BoardPage;