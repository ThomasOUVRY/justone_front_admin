import {createLazyFileRoute, useNavigate} from '@tanstack/react-router'
import Button from "../components/Button.tsx";

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    const navigate = useNavigate()

    return (
        <div className="p-2">
            <Button onClick={() => navigate({to: '/new-game'})}>Go to about</Button>

            <table>
                <th>titi</th>
                <th>toto</th>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>4</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
