export default function Scoreboard ({ playerScore, houseScore, gameStatus }) {
  return (
    <div className='scoreboard text-center mb-4'>
      <div className='text-2xl'>
        <h2>
          Player: <span className='font-bold'>{playerScore}</span>
        </h2>
        <h2>
          House: <span className='font-bold'>{houseScore}</span>
        </h2>
      </div>
      {gameStatus && (
        <div
          className={`game-status text-4xl mt-4 ${
            gameStatus === 'win'
              ? 'text-green-500'
              : gameStatus === 'lose'
              ? 'text-red-700'
              : 'text-yellow-500'
          } font-bold`}
        >
          <h2>{gameStatus.toUpperCase()}</h2>
        </div>
      )}
    </div>
  )
}
