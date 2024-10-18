import Image from 'next/image'

export default function Logo() {
  return (
    <div className="mb-8">
      <Image
        src="https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/a90oc-barbie-stan-logo-fundo-branco.png"
        alt="Barbie Logo"
        width={200}
        height={100}
      />
    </div>
  )
}