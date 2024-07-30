import Card from './Card'

export default function Deck ({ cards }) {
  return (
    <div className='deck flex space-x-4'>
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  )
}
