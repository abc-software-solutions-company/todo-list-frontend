import * as React from 'react';
import {styled} from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, {AccordionProps} from '@mui/material/Accordion';
import MuiAccordionSummary, {AccordionSummaryProps} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';


const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({theme}) => ({
    backgroundColor: '#F8FAFC',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    }
  })
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}} />} {...props} />
))(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  padding: theme.spacing(2)
}));


export default function AccordionIntern({ name, children }: React.PropsWithChildren<{ name: string }>) {
  const [expanded, setExpanded] = React.useState<string | false>('');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
      <Accordion expanded={expanded === name} onChange={handleChange(name)} className="bg-[#F8FAFC] w-64">
        <AccordionSummary aria-controls={`${name}-content`} id={`${name}-header`} className='flex px-1 py-1 justify-between items-center self-stretch m-0'>
          <Typography className='text-lg font-semibold leading-6 m-0 text-gray-700' style={{fontSize: '18px', fontWeight: 600}}>
            {name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='p-0 flex flex-col items-end w-full'>
          { children }
        </AccordionDetails>
      </Accordion>
  );
}