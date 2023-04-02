import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import { Button, Group, Image, TextInput, NumberInput, Box, SimpleGrid, Container } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useCallback } from 'react';

const SubmitCat = (props: {}) => {

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
      age: isInRange({ min: 18, max: 99 }, 'You must be 18-99 years old to register'),
      image: isNotEmpty('Image is required'),
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: [any]) => {
      const [file] = acceptedFiles;

      const img = file;

      form.setFieldValue('img', img);
    },
    [form],
  );


  const preview = (props: { file: Blob | MediaSource }) => {
    const imageUrl = URL.createObjectURL(props.file);
    return (
      <Image
        src={URL.createObjectURL(props.file)}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  };


  return (
    <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit(() => { })}>
      <h1>Submit your cat!</h1>
      <p>Disclaimer: All cats are a perfect 10/10 or greater!</p>

      <TextInput
        label="Your cat's name"
        placeholder="Your cat's name"
        withAsterisk
        mt="md"
        {...form.getInputProps('name')}
      />
      <TextInput
        label="Your cat's breed"
        placeholder="Your cat's breed"
        withAsterisk
        mt="md"
        {...form.getInputProps('type')}
      />
      <NumberInput
        label="Your cat's age"
        placeholder="Your favorite color"
        withAsterisk
        mt="md"
        min={0}
        max={25}
        {...form.getInputProps('age')}
      />
      <TextInput
        label="A fun fact about your cat"
        placeholder="A fun fact about your cat"
        withAsterisk
        mt="md"
        {...form.getInputProps('funfact')}
      />


      <Group position="right" mt="md">
        <Button type="submit" color="pink">Submit your cat!</Button>
      </Group>
    </Box>
  );
}
export default SubmitCat;