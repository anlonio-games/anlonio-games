import moment from 'moment'

export default eventHandler(() => {
  const daysLeft = moment('06/12/2023', 'DD/MM/YYYY').diff(moment().startOf('day'), 'days')
  return `/me O passe acaba em ${daysLeft} dias ⋮-> Saiba mais sobre as recompensas em: http://bit.ly/3RkMatx`
})
