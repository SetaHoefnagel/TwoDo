import {Button, Grid} from "@material-ui/core";
import {AlbumCard} from "./AlbumCard";

export function AlbumOverview() {
    const albums = [
        {
            id: 1,
            title: 'Album 1',
            artist: 'Artist 1'
        },
        {
            id: 2,
            title: 'Album 2',
            artist: 'Artist 2'
        },
        {
            id: 3,
            title: 'Album 3',
            artist: 'Artist 4'
        },
        {
            id: 4,
            title: 'Album 4',
            artist: 'Artist 4'
        }
    ];

    return (
        <Grid container spacing={3}>
            {albums.map(album => (
                <Grid item key={album.id}>
                    <AlbumCard title={album.title} artist={album.artist}/>
                </Grid>
            ))}
            <Grid item key={"new"}>
                <Button size="large" variant={"contained"} color="primary">
                    Add
                </Button>
            </Grid>
        </Grid>
    );
}
