import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import taudenimg from "../static/img/tauden.png";
import Titlepage from '../components/Titlepage';

const Kehoachdantau = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className='gridme wide'>
            <Titlepage name='Kế hoạch dẫn tàu' />

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Tàu đến" value="1" />
                            <Tab label="Tàu rời" value="2" />
                            <Tab label="Tàu dịch chuyển" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <img src={taudenimg} alt="img tàu đến" />
                    </TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
            </Box>
        </div>

    )
}

export default Kehoachdantau