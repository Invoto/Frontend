import React from "react";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
    Chart,
    PieSeries,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import Alert from '@mui/material/Alert';

const Root = props => (
    <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
);
const Label = props => (
    <Legend.Label sx={{ whiteSpace: 'nowrap' }} {...props} />
);

class ExtractionQuotaChart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { extractionProfile } = this.props;

        var profileType = "";
        var extractionPlan = null;
        if (extractionProfile) {
            if (extractionProfile.ConsumerPlan) {
                // Consumer Profile
                profileType = "Consumer";
                extractionPlan = extractionProfile.ConsumerPlan;
            }
            else {
                // Developer Profile
                profileType = "Developer";
                extractionPlan = extractionProfile.DeveloperPlan;
                extractionProfile.usedQuota = extractionProfile.usageQuota;
            }
        }

        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="left"
                justify="left"
            >
                {
                    extractionProfile && extractionPlan ?
                        extractionPlan.quota != -1 ?
                            <Grid item xs={6}>
                                <Paper>
                                    <Chart
                                        data={[
                                            {
                                                region: "Used Quota",
                                                percentage: Math.round((extractionProfile.usedQuota / extractionPlan.quota) * 100),
                                            },
                                            {
                                                region: "Available Quota",
                                                percentage: Math.round(100 - ((extractionProfile.usedQuota / extractionPlan.quota) * 100)),
                                            }
                                        ]}
                                    >
                                        <PieSeries
                                            valueField="percentage"
                                            argumentField="region"
                                        />
                                        <Title
                                            text={`Usage of ${profileType} Quota`}
                                        />
                                        <Animation />

                                        <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                                    </Chart>
                                </Paper>
                            </Grid>
                            :
                            <Grid item xs={12}>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="info">You are using the unlimited plan!</Alert>

                                    <Paper>
                                        <Chart
                                            data={[
                                                {
                                                    region: "Percentage Available",
                                                    percentage: 100,
                                                },
                                            ]}
                                        >
                                            <PieSeries
                                                valueField="percentage"
                                                argumentField="region"
                                            />
                                            <Title
                                                text="Available Quota"
                                            />
                                            <Animation />

                                            <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                                        </Chart>
                                    </Paper>
                                </Stack>
                            </Grid>
                        :
                        <div></div>
                }
            </Grid>
        );
    }

}

export default ExtractionQuotaChart;
