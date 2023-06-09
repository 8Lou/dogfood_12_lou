import BsCard from "../components/BsCard"
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/context";
import { Button } from "../components/Button/Button";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";

const Catalog = ({ setServerGoods }) => {
    const { goods, text } = useContext(AppContext)

    const paginate = usePagination(goods, 8)
    const [sort, setSort] = useState(null)

    useEffect(() => {
        paginate.step(1);
    }, [text])

    const sortHandler = (vector) => {
        if (vector === sort) {
            setSort(null)
            goods.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        } else {
            setSort(vector)
            goods.sort((a, b) => {
                return vector === "up" ? (a.price - b.price) : (b.price - a.price)
            })
        }
    }
    return <div className="container">
        <div style={{
            gridColumnEnd: "span 4",
            display: "flex",
            gap: "20px"
        }}>
            <Button
                style={{ color: '#88a3e2', backgroundColor: sort === "up" ? "#fc8dca" : "#aaecfc" }}
                onClick={() => sortHandler("up")}
            >По возростанию цены</Button>
            <Button
                style={{ color: '#88a3e2', backgroundColor: sort === "down" ? "#fc8dca" : "#aaecfc" }}
                onClick={() => sortHandler("down")}
            >По убыванию цены</Button>
            <Button
                style={{ color: '#88a3e2', backgroundColor: sort === "up" ? "#fc8dca" : "#aaecfc" }}
                onClick={() => sortHandler("up")}>Новинки</Button>
            <Button
                style={{ color: '#88a3e2', backgroundColor: sort === "up" ? "#fc8dca" : "#aaecfc" }}
                onClick={() => sortHandler("up")}>По скидке</Button>
        </div>
        <div style={{ gridColumnEnd: "span 4" }}>{<Pagination num={paginate} />}</div>
        {paginate.setDataPerPage().map(g => <BsCard
            key={g._id}
            {...g}
            img={g.pictures}
            setServerGoods={setServerGoods}
        />)}
    </div>
}

export default Catalog;