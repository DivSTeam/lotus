import React, { useState } from 'react'


function FilterPanel() {
    const [minPrice, setMinPrice] = useState(10);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [checked, setCheked] = useState(false)

    const filterList = [
        {
            id: 1,
            name: "Popularity"
        },
        {
            id: 2,
            name: "Upper by price"
        },
        {
            id: 3,
            name: "Lower by price"
        },
        {
            id: 4,
            name: "Highest rating"
        },
        {
            id: 5,
            name: "New product"
        }
    ]

    const handleMin = (e) => {
        if(e>=0) {setMinPrice(e);}    
    }
    const handleMax = (e) => {
        if(e<=10000) {setMaxPrice(e);}   
    }

    return(
        <div className="h-screen w-72 border-2 rounded-xl mt-3">
            <header className=' pt-4 pl-3'>
                <h2 className='font-bold text-xl text-gray-500'>Filter</h2>
                <h2 className='font-bold text-gl ml-4 mt-2 text-gray-500'>Price caps</h2>
            </header>

            {/* Input price range */}
            <div className='flex mt-3'>
                <div className=' m-auto'>
                    <div className=''>
                        <span className=''>Min</span>
                    </div>
                    <input 
                        className=' w-24 h-9 text-center'
                        type="number" value={minPrice} onChange={e => handleMin(e.target.value)}>   
                    </input>
                </div>

                <div className='m-auto'>
                    <div>
                        <span>Max</span>
                    </div>
                    <input 
                        className='w-24 h-9 text-center'
                        type="number" value={maxPrice} onChange={e => handleMax(e.target.value)}>
                    </input>
                </div>
            </div>

            {/* Slider */}
            <div className="mt-4 flex items-center justify-center ">
                <div className="range-input relative w-3/4 ">
                <input
                        type="range"  
                        className="border-none w-full "   
                />
                </div>
            </div>

            {/* filter */}
            <div className=' ml-4 mt-6'>
                <div>
                    <h2 className='font-bold text-gl ml-4 mt-2 text-gray-500'>Sort by</h2>
                </div>
                <div className='ml-8 mt-3 text-gl'>
                    <ul className=''> 
                        {filterList.map(filter => (
                            <li>
                                <input className=' accent-[#1D912C] h-4 w-4 ' type='radio' checked={filter.id==checked} onClick={() => setCheked(filter.id)}/>
                                <span className='ml-2'>{filter.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FilterPanel