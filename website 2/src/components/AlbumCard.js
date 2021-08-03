import logo from '../logo.svg'
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Typography
} from "@material-ui/core";

export const AlbumCard = (props) => {
    return (
        <Card>
            <CardActionArea>
                <CardHeader title={props.title} subheader={props.artist}/>
                <CardMedia image={logo} title={props.title}/>
                <CardContent>
                    <Typography variant={"body2"} color={"textSecondary"} component={"p"}>
                        This is a test description of the album
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
}
