import { useCallback, useEffect, useState } from 'react';
import { AddItemForm } from './AddNewItemForm';
import { ItemDisplay } from './ItemDisplay';
import type { TodoItem } from '../types/TodoItem';

export function TodoListCard() {
    const [items, setItems] = useState<TodoItem[] | null>(null);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const res = await fetch('/api/items');

                if (!res.ok) throw new Error();

                const data: TodoItem[] = await res.json();

                setItems(data);
            } catch (err) {
                console.error(err);
            }
        };

        loadItems();
    }, []);

    const onNewItem = useCallback((newItem: TodoItem) => {
        setItems((prev) => (prev ? [...prev, newItem] : [newItem]));
    }, []);

    const onItemUpdate = useCallback((updatedItem: TodoItem) => {
        setItems((prev) =>
            prev
                ? prev.map((item) =>
                    item.id === updatedItem.id ? updatedItem : item,
                )
                : prev,
        );
    }, []);

    const onItemRemoval = useCallback((removedItem: TodoItem) => {
        setItems((prev) =>
            prev ? prev.filter((item) => item.id !== removedItem.id) : prev,
        );
    }, []);

    if (items === null) return <>Loading...</>;

    return (
        <>
            <AddItemForm onNewItem={onNewItem} />

            {items.length === 0 && (
                <p className="text-center">
                    No items yet! Add one above!
                </p>
            )}

            {items.map((item) => (
                <ItemDisplay
                    key={item.id}
                    item={item}
                    onItemUpdate={onItemUpdate}
                    onItemRemoval={onItemRemoval}
                />
            ))}
        </>
    );
}