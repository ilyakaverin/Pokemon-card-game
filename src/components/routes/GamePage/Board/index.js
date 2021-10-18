import s from './style.module.css';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import PokemonCard from '../../../PokemonCards';
import { useHistory } from 'react-router-dom';
import PlayerBoard from './component/playerBoard';
import { useDispatch, useSelector } from 'react-redux';
import { SelectedPokemon, setWinner, selectPokemonsData, setWin } from '../../../../store/pokemons';
import { setPlayerToRedux } from '../../../../store/pokemons2';
import ArrowChoice from './component/ArrowChoice';
import request from '../../../../service/request';
import Result from './component/Result';
import { counterWin, returnBoard } from './utils';


  
  const BoardPage = () => {
    const history = useHistory();
    const winner = useSelector(setWin);
    const selectedRedux = useSelector(SelectedPokemon);
    const pokemonsSelector = useSelector(selectPokemonsData);
    const dispatch = useDispatch();
    const [playerTwo, setPlayerTwo] = useState([]);
    const [chooseCard, setChooseCard] = useState("");
    const [steps, setSteps] = useState(0);
    const [board, setBoard] = useState([]);
    const [serverBoard, setServerBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [firstTurn, setFirstTurn] = useState(0);
  
    if (Object.keys(selectedRedux).length === 0) {
      history.replace("/game");
    }
  
    const [playerOne, setPlayerOne] = useState(() => {
      return Object.values(selectedRedux).map((item) => ({
        ...item,
        possession: "blue",
      }));
    });
  
    
  
    useEffect(() => {
      const fetchData = async () => {
        const boardRequest = await request.getBoard();
        setBoard(boardRequest.data);
        const player2Request = await request.gameStart({
          pokemons: Object.values(pokemonsSelector),
        });
        dispatch(setPlayerToRedux(player2Request.data));
  
        setPlayerTwo(() =>
          player2Request.data.map((item) => ({
            ...item,
            possession: "red",
          }))
        );
      };
  
      fetchData();
      // eslint-disable-next-line
    }, []);
  
    const aiMove = (game) => {
      if (game.move !== null) {
        setTimeout(() => {
          setPlayerTwo(() => game.hands.p2.pokes.map((item) => item.poke));
          setServerBoard(game.board);
          setBoard(returnBoard(game.board));
          setSteps((prevState) => {
            const count = prevState + 1;
            return count;
          });
        }, 1500);
      }
    };
  
    useEffect(() => {
      const FirstTurnAI = async () => {
        if ( playerTwo.length < 5) {
          return;
        }
        if (Math.floor(Math.random() * 100) % 2 === 0 && steps === 0) {
          setFirstTurn(2);
          const params = {
            currentPlayer: "p2",
            hands: {
              p1: playerOne,
              p2: playerTwo,
            },
            move: null,
            board: serverBoard,
          };
          const game = await request.game(params);
  
          aiMove(game);
        } else {
          setFirstTurn(1);
        }
      }
      FirstTurnAI()
      // eslint-disable-next-line
    }, [playerTwo]);
  
    const handleBoardPlate = async (position) => {
      if (typeof chooseCard === "object") {
        const params = {
          currentPlayer: "p1",
          hands: {
            p1: playerOne,
            p2: playerTwo,
          },
          move: {
            poke: { ...chooseCard },
            position,
          },
          board: serverBoard,
        };
        if (chooseCard.player === 1) {
          setPlayerOne((prevState) =>
            prevState.filter((item) => item.id !== chooseCard.id)
          );
          setChooseCard("");
        }
        const game = await request.game(params);
  
        setBoard((prevState) =>
          prevState.map((item) => {
            if (item.position === position) {
              return {
                ...item,
                card: chooseCard,
              };
            }
            return item;
          })
        );
  
        setBoard(returnBoard(game.oldBoard));
        setSteps((prevState) => {
          const count = prevState + 1;
          return count;
        });
        aiMove(game);
      }
    };

    useEffect(() => {
      if (steps === 9) {
        const [countOne, countTwo] = counterWin(board, playerOne, playerTwo);
  
        if (countOne > countTwo) {
          dispatch(setWinner("wins"));
        } else if (countOne < countTwo) {
          dispatch(setWinner("lose"));
        } else {
          dispatch(setWinner("draw"));
        }
      }
      
    }, [board, dispatch, playerOne, playerTwo, steps]);
    return (
      <div className={s.root}>
        <div className={cn(s.playerOne)}>
          <PlayerBoard
            player={1}
            cards={playerOne}
            
            onClickCard={(card) => setChooseCard(card)}
          />
        </div>
        <div className={s.board}>
          {board.map((item) => (
            <div
              key={item.position}
              className={s.boardPlate}
              onClick={() => !item.card && handleBoardPlate(item.position)}
            >
            {steps === 0 ? <ArrowChoice side={firstTurn} /> : <></> }
              {winner !== null ? <Result type={winner} /> : <></>}
              {winner !== null ? (
                setTimeout(() => history.replace("/game/finish"), 3500)
              ) : (
                <></>
              )}
  
              {item.card && <PokemonCard {...item.card} active minimize />}
            </div>
          ))}
        </div>
        <div className={cn(s.playerTwo, s.turn)}>
          <PlayerBoard  player={2} cards={playerTwo} />
        </div>
      </div>
    );
  };
  
  export default BoardPage;