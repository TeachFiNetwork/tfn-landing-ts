import glassFromProblem from "@/assets/appImg/glassFromProblems.png";
import guySvg from "@/assets/appImg/landingGuy.png";
import missionImg from "@/assets/appImg/ourMissionImg.png";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { CirclePlay, Cpu, Glasses, LockKeyhole, Star, WalletMinimal } from "lucide-react";
import britishSchool from "@/assets/appImg/ScoalaRomanoBritanica.png";
import stakingAgency from "@/assets/appImg/stakingAgency.png";
import multiversx from "@/assets/appImg/multiversx.png";
import { teamMembers } from "@/utils/persons";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {/* Hero Section */}
      <div className="max-w-[1400px] mx-auto">
        <section
          id="home"
          className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 min-h-[80vh]">
          <div className="flex-1 space-y-6">
            <h1 className="space-y-2">
              <span className="text-4xl md:text-6xl font-medium bg-gradient-to-r from-[#20b3a7] to-[#055370] bg-clip-text text-transparent block">
                Decentralized Education
              </span>
              <span className="text-4xl md:text-6xl font-medium block">for a Better Tomorrow</span>
            </h1>
            <p className="text-muted-foreground text-lg font-light max-w-xl tracking-wide">
              Empowering schools, teachers, and students with blockchain technology to build a
              transparent, sustainable, and innovative education system for generations to come.
            </p>
            <Button size="lg" variant="outline">
              <CirclePlay className="!w-5 !h-5" />
              Play Video
            </Button>
          </div>
          <div className="flex-1">
            <img src={guySvg} alt="Hero" className="w-full" />
          </div>
        </section>
      </div>

      {/* Mission Section */}
      <section id="vision" className="bg-[#E6EFF3] py-16 px-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto gap-8 items-center">
          <div className="w-full max-w-[328px] mx-auto">
            <img src={missionImg} alt="Mission" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className="flex flex-col gap-4 text-left">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              At TeachFi, our mission is to reshape the way education is funded and managed. By
              leveraging blockchain technology, we empower schools to expand, reward educators
              fairly, and provide students with better opportunities to succeed. We aim to build a
              global ecosystem where education thrives, resources are optimized, and every child's
              potential is unlocked.
            </p>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section id="problems" className="space-y-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center">Problems we Solve</h2>
        <div className="relative flex justify-center items-center min-h-[600px]">
          {/* Center Image */}
          <div className="absolute top-0 translate-x-14 w-[500px]">
            <img src={glassFromProblem} alt="Books" className="w-5/6" />
          </div>

          {/* Left Problems */}
          <div className="absolute left-0 top-0 space-y-20 text-left w-[320px]">
            <div className="space-y-3">
              <div className="bg-[#D9E7EC] w-9 h-9 rounded-full flex items-center justify-center">
                <WalletMinimal className="w-4 h-4 text-[#00394F]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Inefficient Resource Allocation →</h3>
                <p className="text-sm text-muted-foreground">
                  Traditional education systems struggle with bureaucracy, delaying funds where
                  they're needed most. TeachFi ensures that financial resources reach schools and
                  programs directly, improving their impact.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-[#D9E7EC] w-9 h-9 rounded-full flex items-center justify-center">
                <Glasses className="w-4 h-4 text-[#00394F]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Teacher Undercompensation →</h3>
                <p className="text-sm text-muted-foreground">
                  Educators often face delayed or insufficient payments. With our automated systems,
                  teachers receive timely and fair compensation, motivating them to excel in their
                  roles.
                </p>
              </div>
            </div>
          </div>

          {/* Right Problems */}
          <div className="absolute right-0 top-0 space-y-20 text-right w-[300px]">
            <div className="space-y-3">
              <div className="ml-auto bg-[#D9E7EC] w-9 h-9 rounded-full flex items-center justify-center">
                <Cpu className="w-4 h-4 text-[#00394F]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">← Limited Access to Quality Funding</h3>
                <p className="text-sm text-muted-foreground">
                  Many schools lack the tools to attract and manage necessary funds. Through
                  tokenized ecosystems, TeachFi enables schools to raise capital effectively for
                  growth and development.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="ml-auto bg-[#D9E7EC] w-9 h-9 rounded-full flex items-center justify-center">
                <LockKeyhole className="w-4 h-4 text-[#00394F]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">← Unverifiable Student Credentials</h3>
                <p className="text-sm text-muted-foreground">
                  Paper-based certificates and transcripts are prone to loss or forgery. TeachFi
                  digitizes student achievements on a secure platform, ensuring they can be accessed
                  and trusted throughout their lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Tracker Section */}
      <section id="impact" className="space-y-8 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-semibold">Impact Tracker</h2>
        <p className="text-muted-foreground text-lg">
          In a world where creativity meets technology, we provide the tools to craft stunning
          interfaces and exceptional products.
        </p>
        <div className="flex justify-center items-center gap-16 mt-12">
          <div className="text-center">
            <h3 className="text-5xl font-bold text-[#00394F]">25+</h3>
            <p className="text-muted-foreground">Franchises</p>
          </div>

          <Separator orientation="vertical" className="bg-black/10 w-[0.1px] h-16" />

          <div className="text-center">
            <h3 className="text-5xl font-bold text-[#00394F]">1,250</h3>
            <p className="text-muted-foreground">Students</p>
          </div>

          <Separator orientation="vertical" className="bg-black/10 w-[0.1px] h-16" />

          <div className="text-center">
            <h3 className="text-5xl font-bold text-[#00394F]">548</h3>
            <p className="text-muted-foreground">Employees</p>
          </div>
        </div>
      </section>

      <section id="partners" className="bg-[#E6EFF3] py-10 px-4 rounded-lg">
        <div className="w-full flex flex-col justify-center items-center">
          <h6>Partners</h6>
          <div className="flex w-full justify-center items-center gap-8">
            <img src={britishSchool} alt="britishSchool" />
            <img src={stakingAgency} alt="britishSchool" className="w-[10rem] h-[2rem]" />
            <img src={multiversx} alt="britishSchool" className="w-[9rem] h-[1.5rem]" />
          </div>
        </div>
      </section>

      <section id="team" className="space-y-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <span className="text-sm font-semibold text-muted-foreground">
            Brilliant minds behind
          </span>
          <h2 className="text-4xl font-semibold">Meet our team</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our philosophy is simple — hire a team of diverse, passionate people and foster a
            culture that empowers you to do your best work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="bg-slate-100/50 border-0 w-[19rem] min-w-[13.5rem] h-[25rem]">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex flex-col items-center space-y-3">
                    <Avatar className="w-24 h-24 flex items-center justify-center">
                      <AvatarImage
                        src={member.image}
                        alt={member.name}
                        className="!w-[6rem] !h-[6rem]"
                      />
                      <AvatarFallback className="bg-slate-200 p-4 rounded-full">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 text-center">
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center tracking-wide font-light">
                    {member.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
