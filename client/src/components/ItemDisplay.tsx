import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';

import type { TodoItem } from '../types/TodoItem';

import './ItemDisplay.scss';

interface ItemDisplayProps {
    item: TodoItem;
    onItemUpdate: (item: TodoItem) => void;
    onItemRemoval: (item: TodoItem) => void;
}

export function ItemDisplay({
    item,
    onItemUpdate,
    onItemRemoval,
}: ItemDisplayProps) {
    const toggleCompletion = async () => {
        try {
            const response = await fetch(`/api/items/${item.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name: item.name,
                    completed: !item.completed,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update item');
            }

            const updatedItem: TodoItem = await response.json();

            onItemUpdate(updatedItem);
        } catch (err) {
            console.error(err);
        }
    };

    const removeItem = async () => {
        try {
            const response = await fetch(`/api/items/${item.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete item');
            }

            onItemRemoval(item);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container
            fluid
            className={`item ${item.completed ? 'completed' : ''}`}
        >
            <Row>
                <Col xs={2} className="text-center">
                    <Button
                        size="sm"
                        variant="link"
                        onClick={toggleCompletion}
                        aria-label={
                            item.completed
                                ? 'Mark item as incomplete'
                                : 'Mark item as complete'
                        }
                    >
                        <FontAwesomeIcon
                            icon={
                                item.completed
                                    ? faCheckSquare
                                    : faSquare
                            }
                        />
                    </Button>
                </Col>

                <Col xs={8} className="name">
                    {item.name}
                </Col>

                <Col xs={2} className="text-center remove">
                    <Button
                        size="sm"
                        variant="link"
                        onClick={removeItem}
                        aria-label="Remove Item"
                    >
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="text-danger"
                        />
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}