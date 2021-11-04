import "../stylesheets/App.scss"
import { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Navbar from "react-bootstrap/Navbar"
import ListGroup from "react-bootstrap/ListGroup"
import { fetchOdds } from "../api/fetchOdds"
import { sportsList } from "../constant"
import { SportsCard } from "./SportsCard"
import { OddsModal } from "./OddsModal"

function App() {
  const [odds, setOdds] = useState(null)
  const [activeSport, setActiveSport] = useState("soccer_epl")
  const [error, setError] = useState(false)
  const [activeGame, setActiveGame] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  // when modal set to true its open and when false it is closed
  useEffect(() => {
    const getOdds = async () => {
      const result = await fetchOdds(activeSport)
      if (result.success) {
        setOdds({ ...odds, soccer_epl: result.data })
      }
      if (result.error) {
        setError(true)
        setOdds({})
      }
    }
    getOdds()
  }, [])
  if (!odds) {
    return null
  }

  const onSeeMoreOdds = (game) => {
    setActiveGame(game)
    setModalShow(true)
  }
  console.log(odds, "::odds")
  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-2">
        <Container>
          <Navbar.Brand>Sports Odds Collection</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12} md={2}>
            <ListGroup>
              {sportsList.map((sport) => {
                return (
                  <ListGroup.Item
                    key={sport.key}
                    as="button"
                    onClick={() => setActiveSport(sport.key)}
                    active={activeSport === sport.key}
                    // does comparison check between the active sport currently within state compared to the sport key
                    // if they are equal then it will highlight that button
                  >
                    {sport.view}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
          <Col xs={12} md={10}>
            {error ? (
              <h5>Sports Odd API is not available...Please check in later</h5>
            ) : (
              <Row>
                {odds[activeSport] ? (
                  odds[activeSport].map((sportsGame) => {
                    return (
                      <Col
                        key={sportsGame.id}
                        xs={12}
                        md={4}
                        className="mb-3
                      sports-grid-divider"
                      >
                        <SportsCard
                          sportsGame={sportsGame}
                          onSeeMoreOdds={onSeeMoreOdds}
                        />
                      </Col>
                    )
                  })
                ) : (
                  <div> No sports yet </div>
                )}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
      <OddsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        activeGame={activeGame}
      />
    </>
  )
}

export default App
