import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Box from "@mui/material/Box";
import { DateTime } from "luxon";

class VolunteeredImageList extends React.Component {

    constructor(props) {
        super(props);

        this.handleImageInfoClick = this.handleImageInfoClick.bind(this);
    }

    handleImageInfoClick(imageURL) {
        window.open(imageURL, "_blank").focus();
    }

    render() {
        return (
            <ImageList gap={1} cols={5}>
                {
                    this.props.vdocs && this.props.vdocs
                        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                        .map((vDoc) => (
                            <ImageListItem key={vDoc.id} sx={{
                                height: 500,
                                width: 300,
                                maxHeight: { xs: 200, md: 500 },
                                maxWidth: { xs: 100, md: 300 },
                            }}>
                                <Box
                                    component="img"
                                    sx={{
                                        height: 500,
                                        width: 300,
                                        maxHeight: { xs: 200, md: 500 },
                                        maxWidth: { xs: 100, md: 300 },
                                    }}
                                    className='my-3'
                                    src={vDoc.imageURL + "?w=300&fit=crop&auto=format"}
                                    srcSet={vDoc.imageURL + "?w=300&fit=crop&auto=format"}
                                />
                                <ImageListItemBar
                                    title="Submitted On"
                                    subtitle={DateTime.fromISO(vDoc.createdAt).toFormat("yyyy-MMM-dd hh:mm:ssa ZZZZ")}
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            aria-label={`View Volunteered Document ${vDoc.id}`}
                                            onClick={(event) => this.handleImageInfoClick(vDoc.imageURL)}
                                        >
                                            <CloudDownloadIcon />
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))
                }
            </ImageList>
        );
    }

}

export default VolunteeredImageList;
