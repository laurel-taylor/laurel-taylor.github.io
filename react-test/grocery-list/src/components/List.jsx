import './List.css'
function List({ items, onClickItem }) {
    return (
        <>
            {items?.length > 0 && (
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            <button onClick={() => onClickItem?.(item)}>
                                {item.icon} {item.name} {item.count ? `${item.count} ($${(item.count * item.price).toFixed(2)})` : null}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default List;
