import { useForm, isNotEmpty, isInRange, hasLength, } from '@mantine/form';
import { Button, Group, TextInput, NumberInput, Box, Image, Text, SimpleGrid, createStyles } from '@mantine/core';
import { useState } from 'react';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';

const useStyles = createStyles((theme) => ({
  dropzone: {
    marginTop: theme.spacing.lg,
  }
}));

const SubmitCat = (props: {}) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const { classes } = useStyles();
  

  const form = useForm({
    initialValues: {
      name: '',
      age: '',
      type: '',
      funfact: '',
      image: files[0],
    },

    validate: {
      name: hasLength({ min: 2, max: 20 }, 'Name must be 2-20 characters long'),
      type: hasLength({ min: 2, max: 20 }, 'Type must be 2-20 characters long'),
      age: isInRange({ min: 0, max: 25 }, 'You must be 18-99 years old to register'),
      image: isNotEmpty('Image is required'),
    },
  });

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  const submitCat = () => {
    const data = form.values;

    // Submit form data to API
    fetch('/api/cats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
    //Reset form data
    form.reset();
    setFiles([]);
      
  };

  const saveInForm = (files: FileWithPath[]) => {
    setFiles(files);
    form.setFieldValue('image', files[0]);
  };


  return (
    <Box component="form" maw={600} mx="auto" onSubmit={submitCat}>
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
      <div>
        <Dropzone accept={IMAGE_MIME_TYPE} onDrop={(files) => saveInForm(files)} className={classes.dropzone}>
          <Text align="center">Add an image of your cat</Text>
        </Dropzone>

        <SimpleGrid
          cols={4}
          breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
          mt={previews.length > 0 ? 'xl' : 0}
        >
          {previews}
        </SimpleGrid>
      </div>


      <Group position="right" mt="md">
        <Button type="submit" color="pink">Submit your cat!</Button>
      </Group>
    </Box>
  );
}
export default SubmitCat;