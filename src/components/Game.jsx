import React, { useState, useEffect, useCallback } from 'react'
import Deck from './Deck'
import Scoreboard from './Scoreboard'
import Button from '../common/Button'
import { getNewDeck, drawCards } from '../services'

const Game = () => {
  const [deckId, setDeckId] = useState('')
  const [playerCards, setPlayerCards] = useState([])
  const [houseCards, setHouseCards] = useState([])
  const [gameStatus, setGameStatus] = useState('')

  const drawInitialCards = useCallback(async deckId => {
    const data = await drawCards(deckId, 4)
    setPlayerCards([data.cards[0], data.cards[1]])
    setHouseCards([data.cards[2], data.cards[3]])
  }, [])

  const getNewDeckData = useCallback(async () => {
    const data = await getNewDeck()
    setDeckId(data.deck_id)
    drawInitialCards(data.deck_id)
  }, [drawInitialCards])

  const calculateScore = cards => {
    let score = 0
    let aces = 0
    cards.forEach(card => {
      if (
        card.value === 'JACK' ||
        card.value === 'QUEEN' ||
        card.value === 'KING'
      ) {
        score += 10
      } else if (card.value === 'ACE') {
        aces += 1
        score += 11
      } else {
        score += parseInt(card.value)
      }
    })
    while (score > 21 && aces > 0) {
      score -= 10
      aces -= 1
    }
    return score
  }

  const handleHit = async () => {
    const data = await drawCards(deckId, 1)
    const newCard = data.cards[0]
    setPlayerCards([...playerCards, newCard])
    const newScore = calculateScore([...playerCards, newCard])
    if (newScore > 21) {
      setGameStatus('lose')
    }
  }

  const handleStand = () => {
    const playerScore = calculateScore(playerCards)
    const houseScore = calculateScore(houseCards)
    if (playerScore > houseScore) {
      setGameStatus('win')
    } else if (playerScore < houseScore) {
      setGameStatus('lose')
    } else {
      setGameStatus('tie')
    }
  }

  const resetGame = () => {
    setDeckId('')
    setPlayerCards([])
    setHouseCards([])
    setGameStatus('')
    getNewDeckData()
  }

  useEffect(() => {
    getNewDeckData()
  }, [getNewDeckData])

  return (
    <div className='flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white p-4'>
      <h1 className='text-5xl font-bold mt-10 mb-5 text-center'>
        Black Jack Game
      </h1>
      <Scoreboard
        playerScore={calculateScore(playerCards)}
        houseScore={calculateScore(houseCards)}
        gameStatus={gameStatus}
      />
      <div className='flex justify-around w-full max-w-4xl mt-8'>
        <Deck cards={playerCards} />
        <Deck cards={houseCards} />
      </div>
      <div className='mt-8 space-x-4'>
        <Button
          className='bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105'
          onClick={handleHit}
          disabled={gameStatus !== ''}
        >
          Hit
        </Button>
        <Button
          className='bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105'
          onClick={handleStand}
          disabled={gameStatus !== ''}
        >
          Stand
        </Button>
        <Button
          className='bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105'
          onClick={resetGame}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

export default Game
