import { Card, CardContent, CardMedia, Checkbox, Typography } from '@mui/material';

interface CandidateCardProps {
    candidate_name: string;
    image: string;
    political_party: string;
    color_card: string;
    isSelected: boolean;
    onClick: () => void;
}

export default function ActionAreaCard({ candidate_name, image, political_party, color_card, isSelected, onClick }: CandidateCardProps) {
    return (
        <Card sx={{
            backgroundColor: color_card, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', borderRadius: '10px',
            margin: 2, height: 350, width: 350
        }} >
            <CardMedia
                component="img"
                image={image}
                alt="Candidate Image"
                sx={{ borderRadius: '20px', alignItems: 'center', 
                height: '150px', width: '200px', margin: '0 auto' }}
            />
            <CardContent>
                <Typography variant="h5" sx={{ textAlign: 'center' }}>
                    {candidate_name}
                </Typography>
                <Typography sx={{ textAlign: 'center' }}>
                    {political_party}
                </Typography>

                <Checkbox
                    checked={isSelected}
                    onChange={onClick}
                    onClick={(e) => e.stopPropagation()}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                />
            </CardContent>

        </Card>
    );
}
