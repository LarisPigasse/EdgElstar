import React from 'react'
import { Tabs } from 'components/ui'
import { AdaptableCard } from 'components/shared'

const { TabNav, TabList, TabContent } = Tabs

const Tabelle = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Tabelle di base</h3>
            </div>
            <div>
                <Tabs defaultValue="tab1">
                    <TabList>
                        <TabNav value="tab1">Nazioni</TabNav>
                        <TabNav value="tab2">Gruppi CAP</TabNav>
                        <TabNav value="tab3">Aree</TabNav>
                    </TabList>
                    <div className="p-4">
                        <TabContent value="tab1">
                            <p>
                                If builders built buildings the way programmers
                                wrote programs, then the first woodpecker that came
                                along would destroy civilization. (Gerald Weinberg)
                            </p>
                        </TabContent>
                        <TabContent value="tab2">
                            <p>
                                A computer lets you make more mistakes faster than
                                any invention in human history–with the possible
                                exceptions of handguns and tequila. (Mitch
                                Radcliffe).
                            </p>
                        </TabContent>
                        <TabContent value="tab3">
                            <p>
                                In C++ it’s harder to shoot yourself in the foot,
                                but when you do, you blow off your whole leg.
                                (Bjarne Stroustrup)
                            </p>
                        </TabContent>
                    </div>
                </Tabs>
            </div>
             
     
        </AdaptableCard>        

    )
}

export default Tabelle
    
    
