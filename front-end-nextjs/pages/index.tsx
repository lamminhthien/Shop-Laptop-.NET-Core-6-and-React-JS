import Head from 'next/head'
import {Accordion} from 'react-bootstrap'
import NavBar from '../components/admin/navbar'
import SideBar from '../components/admin/sidebar'
import Footer from '../components/admin/footer'

export default function Home() {
  return (
    <>
      <NavBar />
      <SideBar />
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      <main>
        <h1>
          Welcome
        </h1>

        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet...
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
              Duis aute irure dolor in reprehenderit in voluptate...
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

      </main>
      <Footer />
    </>
  )
}
