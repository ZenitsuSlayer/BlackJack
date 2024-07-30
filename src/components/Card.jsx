export default function Card ({ card }) {
  return (
    <div className='card'>
      <img
        src={card.image}
        alt={`${card.value} of ${card.suit}`}
        className='w-24'
      />
    </div>
  )
}
