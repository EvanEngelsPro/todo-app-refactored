import { useEffect, useState } from 'react';

export function Greeting() {
    const [greeting, setGreeting] = useState<string | null>(null);

    useEffect(() => {
        const loadGreeting = async () => {
            try {
                const res = await fetch('/api/greeting');

                if (!res.ok) throw new Error();

                const data = await res.json();

                setGreeting(data.greeting);
            } catch (err) {
                console.error(err);
            }
        };

        loadGreeting();
    }, []);

    if (!greeting) return null;

    return <h1 className="text-center mb-5">{greeting}</h1>;
}