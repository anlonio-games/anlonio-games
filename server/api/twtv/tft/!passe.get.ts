import moment from 'moment'

export default eventHandler(() => {
  const daysLeft = moment('12/09/2023', 'DD/MM/YYYY').diff(moment().startOf('day'), 'days')
  return `/me O passe acaba em ${daysLeft} dias ⋮-> Saiba mais sobre as recompensas em: https://bit.ly/3N3peez`
})
