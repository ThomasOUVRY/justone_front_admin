import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/new-game')({
    component: NewGame,
})

function NewGame() {
    return <div className="p-2">Hello from new games creation</div>
}
