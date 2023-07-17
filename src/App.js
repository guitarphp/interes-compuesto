import { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import Section from './components/Section'
import Balance from './components/Balance'

const calculateInterest = (deposit, constribution, years, rate) => {
  let total = deposit
  for (let i = 0; i < years; i++) {
    total = (total + constribution) * (rate + 1)
  }
  return Math.round(total)
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const App = () => {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({ deposit, constribution, years, rate }) => {
    const val = calculateInterest(
      Number(deposit),
      Number(constribution),
      Number(years),
      Number(rate)
    )
    setBalance(formatter.format(val))  
  }
  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            constribution: '',
            years: '',
            rate: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number().required('Obligatorio').typeError('Debe ser un numero'),
            constribution: Yup.number().required('Obligatorio').typeError('Debe ser un numero'),
            years: Yup.number().required('Obligatorio').typeError('Debe ser un numero'),
            rate: Yup
            .number()
            .required('Obligatorio')
            .typeError('Debe ser un numero')
            .min(0, 'El valor minimo es 0')
            .max(1, 'El valor maximo es 1')
          })}
        >
          <Form>
            <Input name='deposit' label='Depósito inicial' />
            <Input name='constribution' label='Constribucion anual' />
            <Input name='years' label='Annos' />
            <Input name='rate' label='Interes estimado' />
            <Button type='button'>Calcular</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance>Balance Final: {balance}</Balance>: null}
      </Section>
    </Container>
  )
}

export default App
