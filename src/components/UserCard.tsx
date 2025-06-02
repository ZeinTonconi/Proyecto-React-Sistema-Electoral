import { Avatar, Card, Stack, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
interface UserCardProps {
    labelAndData?: { label: string; data: string }[];
    addPhoto: boolean
}
const UserCard = ({labelAndData, addPhoto}: UserCardProps) => {
    return(
        <Card sx={{ margin: "auto", marginTop: 4, boxShadow: 3 }}>
            <Typography variant="h5" component="div" sx={{ padding: 2 }}>
                Información del usuario
            </Typography>
            <Stack direction="row" spacing={2} sx={{ margin: 2}}>
            {addPhoto && (
                <Avatar sx={{ bgcolor: deepPurple[500], width: 112, height: 112, margin: 2 }}>
                    <Typography variant="h4" sx={{ color: "white" }}>
                        {labelAndData?.[0]?.data?.charAt(0) }{labelAndData?.[1]?.data?.charAt(0)}
                    </Typography>
                </Avatar>
            )}
            <div style={{ padding: 16 }}>
                {labelAndData?.map((item, index) => (
                    <Typography key={index} variant="body1" sx={{ marginBottom: 1 }}>
                        <strong>{item.label}:</strong> {item.data}
                    </Typography>
                ))}
            </div>
            </Stack>
        </Card>
    )
}

export default UserCard;