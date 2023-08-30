import { useForm,isInRange, hasLength, matches, } from '@mantine/form';
import { Button, Group, TextInput, NumberInput, Box } from '@mantine/core';



const SubmitCat = () => {
  const form = useForm({
    initialValues: {
      name: '',
      age: '',
      type: '',
      funfact: '',
      image: '',
    },

    validate: {
      name: hasLength({ min: 2, max: 20 }, 'Name must be 2-20 characters long'),
      type: hasLength({ min: 2, max: 20 }, 'Type must be 2-20 characters long'),
      age: isInRange({ min: 0, max: 25 }, 'You must be 18-99 years old to register'),
      image: matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'Please enter a valid URL'),
    },
  });

  const submitCat = () => {
    const data = form.values;

    // Submit form data to API
    fetch('https://ca-api-orlsk4hsi7bdc.icyglacier-6dbb1eaa.eastus.azurecontainerapps.io/api/cats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res)
        res.json()
      })
    //Reset form data
    form.reset();
  };


  return (
    <Box maw={600} mx="auto">
      <form onSubmit={form.onSubmit(submitCat)}>
        <h1>Submit your cat!</h1>
        <p>Disclaimer: All cats are a perfect 10/10 or greater!</p>

        <TextInput
          label="Your cat's name"
          withAsterisk
          mt="md"
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Your cat's breed"
          withAsterisk
          mt="md"
          {...form.getInputProps('type')}
        />
        <NumberInput
          label="Your cat's age"
          withAsterisk
          mt="md"
          min={0}
          max={25}
          {...form.getInputProps('age')}
        />
        <TextInput
          label="A fun fact about your cat"
          withAsterisk
          mt="md"
          {...form.getInputProps('funfact')}
        />
        <TextInput
          label="A URL to your cat's image"
          withAsterisk
          mt="md"
          {...form.getInputProps('image')}
        />
        <Group position="right" mt="md">
          <Button type="submit" color="pink">Submit your cat!</Button>
        </Group>
      </form>
    </Box>
  );
}
export default SubmitCat;