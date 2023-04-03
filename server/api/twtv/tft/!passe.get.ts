import moment from 'moment'

export default eventHandler(() => {
  const daysLeft = moment('13/06/2023', 'DD/MM/YYYY').diff(moment().startOf('day'), 'days')
  return `/me O passe acaba em ${daysLeft} dias. Saiba mais sobre as recompensas em: https://teamfighttactics.leagueoflegends.com/pt-br/news/game-updates/passe-glitch-total-e-mais/`
})
