import { useEffect, useState } from 'react';
import { Table, ScrollArea, Group, Avatar, Text, rem, Container } from '@mantine/core';
import { Cat, Cats} from './types';

const CatTable = () => {
    const [cats, setCats] = useState([])
    const [requesting, setRequesting] = useState(true);

    useEffect(() => {
        fetchCats();
    }, []);


    const fetchCats = () => {
        setRequesting(true);

        fetch("/api/cats")
            .then(res => res.json())
            .then(data => {
                setCats(data);
                setRequesting(false);
            })        
    };

    const rows = cats.map((cat: Cat) => {
        return (
            <tr key={cat.id}>
                <td>
                    <Group spacing="sm">
                        <Avatar size={26} src={cat.image} radius={26} />
                        <Text size="sm" weight={500}>
                            {cat.name}
                        </Text>
                    </Group>
                </td>
                <td>{cat.age}</td>
                <td>{cat.type}</td>
                <td>{cat.funfact}</td>
                <td>{cat.average_rating}!!!</td>
            </tr>
        );
    });

    return (
        <Container>
            <h1>All the cute cats!</h1>
            {cats == undefined || (!cats.length && !requesting) ? <Text size="xl" color="gray">No cats yet!</Text> :
                <ScrollArea>
                    <Table miw={800} verticalSpacing="sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Type</th>
                                <th>Fun Fact</th>
                                <th>Cuteness Score (out of 10)</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </ScrollArea>
            }
        </Container>
    );
}

export default CatTable;