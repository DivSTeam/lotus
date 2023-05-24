// import { useState } from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useRouter } from 'next/router';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#1D912C',
        },
    },
});

// const filterList = [
//     {
//         id: 1,
//         name: "Popularity"
//     },
//     {
//         id: 2,
//         name: "Upper by price"
//     },
//     {
//         id: 3,
//         name: "Lower by price"
//     },
//     {
//         id: 4,
//         name: "Highest rating"
//     },
//     {
//         id: 5,
//         name: "New product"
//     },
//     {
//         id: 6,
//         name: "Sample brand"
//     }
// ]

function FilterPanel({ Popularity, Brand, handleChecked }) {
    const minPrice = 0;
    const maxPrice = 10000;

    const [price, setPrice] = React.useState([1000, 5000]);


    const handleChange = (event, newValue) => {
        setPrice(newValue);
    }



    const handleMin = (e) => {
        if (e >= 0 && e <= 10000) { setPrice(prev => [e, prev[1]]); }
    }
    const handleMax = (e) => {
        if (e >= 0 && e <= 10000) { setPrice(prev => [prev[0], e]); }
    }



    return (
        <div className="h-[34rem] w-60 border-2 rounded-xl mt-3">
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
                        className=' w-20 h-8 text-center rounded-md'
                        type="number" value={price[0]} onChange={e => handleMin(e.target.value)}>
                    </input>
                </div>

                <div className='m-auto'>
                    <div>
                        <span>Max</span>
                    </div>
                    <input
                        className='w-20 h-8 text-center rounded-md'
                        type="number" value={price[1]} onChange={e => handleMax(e.target.value)}>
                    </input>
                </div>
            </div>

            {/* Slider */}
            <div className="mt-4 flex items-center justify-center ">
                <div className="range-input relative w-3/4 ">
                    <ThemeProvider theme={theme}>
                        <Box >
                            <Slider
                                min={minPrice}
                                max={maxPrice}
                                color="secondary"
                                value={price}
                                onChange={handleChange}
                            />
                        </Box>
                    </ThemeProvider>
                </div>
            </div>

            {/* filter */}
            <div className=' ml-4 mt-6'>
                <div>
                    <h2 className='font-bold text-gl ml-4 mt-2 text-gray-500'>Sort by</h2>
                </div>

                <div className='ml-8 mt-3 text-gl'>
                    <ul className=''>

                        <li className='mb-2'>
                            <input
                                className=' accent-[#1D912C] h-4 w-4'
                                type='checkbox' //checked={checked.includes(Popularity)}
                                onClick={() => handleChecked(Popularity)}
                            />
                            <span className='ml-2'>{Popularity}</span>
                        </li>

                        <li className='mb-2'>
                            <input
                                className=' accent-[#1D912C] h-4 w-4'
                                type='checkbox' //checked={checked.includes(Brand)}
                                onClick={() => handleChecked(Brand)}
                            />
                            <span className='ml-2'>{Brand}</span>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    )
}
export default FilterPanel
