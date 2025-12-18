import { Input } from '@my-app/ui-library'

const InputPage = () => {
  // Обработчик отправки формы
  const handleSubmit = (formData: {
    name: string
    email: string
    phone: string
    password: string
    subscribe: boolean
  }) => {
    console.log('Данные из формы:', formData)
  }

  return (
    <Input 
      onSubmit={handleSubmit}
    />
  )
}

export default InputPage