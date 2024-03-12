import {createLazyFileRoute, useNavigate} from '@tanstack/react-router'
import Button from "../components/Button.tsx";
import {useEffect, useState} from "react";

export const Route = createLazyFileRoute('/')({
    component: Index,
})

type Game = {
    id: number;
    type: string;
    nbPlayers: number;
    status: string;
}

function Index() {
    const navigate = useNavigate();
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/games")
            .then(response => response.json())
            .then((data: Game[]) => setGames(data));
    }, []);

    return (
        <div className="p-2">
            <Button onClick={() => navigate({to: '/new-game'})}>Go to about</Button>
            <h1 className="text-2xl">Hello World</h1>

            <div className="overflow-x-auto">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Number of players</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {games.map(game => (
                            <tr key={game.id}>
                                <td>{game.id}</td>
                                <td>{game.type}</td>
                                <td>{game.nbPlayers}</td>
                                <td>{game.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
