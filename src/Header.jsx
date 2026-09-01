function Header() {
    return (
        <header className="bg-slate-900 text-white">
            <h1 className="text-2xl font-bold">
                IEDC Innovation Hub
            </h1>

            <nav>
                <ul className="flex gap-6">
                    <li>Home</li>
                    <li>Projects</li>
                    <li>Submit Idea</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header