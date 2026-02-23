import { useState, type FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import type { TodoItem } from '../types/TodoItem';

interface AddItemFormProps {
    onNewItem: (item: TodoItem) => void;
}

export function AddItemForm({ onNewItem }: AddItemFormProps) {
    const [newItem, setNewItem] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);

    const submitNewItem = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newItem.trim()) return;

        setSubmitting(true);

        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                body: JSON.stringify({ name: newItem }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to create item');
            }

            const item: TodoItem = await response.json();

            onNewItem(item);

            setNewItem('');
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form onSubmit={submitNewItem}>
            <InputGroup className="mb-3">
                <Form.Control
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    type="text"
                    placeholder="New Item"
                    aria-label="New item"
                />

                <Button
                    type="submit"
                    variant="success"
                    disabled={!newItem.trim().length || submitting}
                >
                    {submitting ? 'Adding...' : 'Add Item'}
                </Button>
            </InputGroup>
        </Form>
    );
}